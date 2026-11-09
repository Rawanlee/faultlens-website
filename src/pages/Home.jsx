import useSeo from '../hooks/useSeo'
import Hero from '../components/sections/Hero'
import Highlights from '../components/sections/Highlights'
import Scenes from '../components/sections/Scenes'
import Problem from '../components/sections/Problem'
import Features from '../components/sections/Features'
import HowItWorks from '../components/sections/HowItWorks'
import DemoSection from '../components/sections/DemoSection'
import UseCases from '../components/sections/UseCases'
import AICapabilities from '../components/sections/AICapabilities'
import AwsArchitecture from '../components/sections/AwsArchitecture'
import Pricing from '../components/sections/Pricing'
import Team from '../components/sections/Team'
import GetStarted from '../components/sections/GetStarted'
import Contact from '../components/sections/Contact'

export default function Home() {
  useSeo('/')
  return (
    <>
      <Hero />
      <Highlights />
      <Scenes />
      <Problem />
      <Features />
      <HowItWorks />
      <DemoSection />
      <UseCases />
      <AICapabilities />
      <AwsArchitecture />
      <Pricing />
      <Team />
      <GetStarted />
      <Contact />
    </>
  )
}
