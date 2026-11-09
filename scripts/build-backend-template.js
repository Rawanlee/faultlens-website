// Builds backend/faultlens-forms.template.json (CloudFormation) with the Lambda
// source from backend/form-handler/index.js inlined, so the stack can be
// deployed from the AWS console without any CLI or packaging step.
import { readFileSync, writeFileSync } from 'node:fs'

const code = readFileSync(new URL('../backend/form-handler/index.js', import.meta.url), 'utf8')
if (code.length > 4096) throw new Error(`Inline Lambda code is ${code.length} chars; CloudFormation ZipFile limit is 4096`)

const t = {
  AWSTemplateFormatVersion: '2010-09-09',
  Description: 'Faultlens website forms: HTTP API (API Gateway) -> Lambda -> Amazon SES email to the Faultlens inbox.',
  Parameters: {
    ToEmail: { Type: 'String', Default: 'shalom@faultlens.space', Description: 'Inbox that receives form submissions' },
    FromEmail: { Type: 'String', Default: 'shalom@faultlens.space', Description: 'Sender address. Must be verified in Amazon SES in this region (or its domain verified).' },
    AllowedOrigins: { Type: 'CommaDelimitedList', Default: 'https://www.faultlens.space,https://faultlens.space', Description: 'Website origins allowed to submit forms' },
  },
  Resources: {
    FormFunctionRole: {
      Type: 'AWS::IAM::Role',
      Properties: {
        AssumeRolePolicyDocument: { Version: '2012-10-17', Statement: [{ Effect: 'Allow', Principal: { Service: 'lambda.amazonaws.com' }, Action: 'sts:AssumeRole' }] },
        ManagedPolicyArns: ['arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'],
        Policies: [{
          PolicyName: 'SendFormEmail',
          PolicyDocument: {
            Version: '2012-10-17',
            Statement: [{
              Effect: 'Allow', Action: ['ses:SendEmail'],
              Resource: { 'Fn::Sub': 'arn:${AWS::Partition}:ses:${AWS::Region}:${AWS::AccountId}:identity/*' },
              Condition: { StringEquals: { 'ses:FromAddress': { Ref: 'FromEmail' } } },
            }],
          },
        }],
      },
    },
    FormFunction: {
      Type: 'AWS::Lambda::Function',
      Properties: {
        Description: 'Validates Faultlens website form submissions and emails them via SES',
        Runtime: 'nodejs22.x', Handler: 'index.handler', Timeout: 10, MemorySize: 256,
        Role: { 'Fn::GetAtt': ['FormFunctionRole', 'Arn'] },
        Environment: { Variables: { TO_EMAIL: { Ref: 'ToEmail' }, FROM_EMAIL: { Ref: 'FromEmail' }, ALLOWED_ORIGINS: { 'Fn::Join': [',', { Ref: 'AllowedOrigins' }] } } },
        Code: { ZipFile: code },
      },
    },
    FormFunctionLogs: {
      Type: 'AWS::Logs::LogGroup',
      Properties: { LogGroupName: { 'Fn::Sub': '/aws/lambda/${FormFunction}' }, RetentionInDays: 30 },
    },
    FormApi: {
      Type: 'AWS::ApiGatewayV2::Api',
      Properties: {
        Name: 'faultlens-forms', ProtocolType: 'HTTP',
        CorsConfiguration: { AllowOrigins: { Ref: 'AllowedOrigins' }, AllowMethods: ['POST', 'OPTIONS'], AllowHeaders: ['content-type', 'accept'], MaxAge: 600 },
      },
    },
    FormIntegration: {
      Type: 'AWS::ApiGatewayV2::Integration',
      Properties: { ApiId: { Ref: 'FormApi' }, IntegrationType: 'AWS_PROXY', IntegrationUri: { 'Fn::GetAtt': ['FormFunction', 'Arn'] }, PayloadFormatVersion: '2.0' },
    },
    FormRoute: {
      Type: 'AWS::ApiGatewayV2::Route',
      Properties: { ApiId: { Ref: 'FormApi' }, RouteKey: 'POST /contact', Target: { 'Fn::Sub': 'integrations/${FormIntegration}' } },
    },
    FormStage: {
      Type: 'AWS::ApiGatewayV2::Stage',
      Properties: { ApiId: { Ref: 'FormApi' }, StageName: '$default', AutoDeploy: true, DefaultRouteSettings: { ThrottlingBurstLimit: 5, ThrottlingRateLimit: 1 } },
    },
    FormInvokePermission: {
      Type: 'AWS::Lambda::Permission',
      Properties: {
        Action: 'lambda:InvokeFunction', FunctionName: { Ref: 'FormFunction' }, Principal: 'apigateway.amazonaws.com',
        SourceArn: { 'Fn::Sub': 'arn:${AWS::Partition}:execute-api:${AWS::Region}:${AWS::AccountId}:${FormApi}/*/*/contact' },
      },
    },
  },
  Outputs: {
    FormEndpoint: {
      Description: 'Set this as VITE_FORM_ENDPOINT in the website hosting environment',
      Value: { 'Fn::Sub': 'https://${FormApi}.execute-api.${AWS::Region}.${AWS::URLSuffix}/contact' },
    },
  },
}
writeFileSync(new URL('../backend/faultlens-forms.template.json', import.meta.url), JSON.stringify(t, null, 2) + '\n')
console.log(`backend/faultlens-forms.template.json written (inline code ${code.length}/4096 chars)`)
