import useSeo from '../hooks/useSeo'
import Button from '../components/ui/Button'
import FaultScene from '../components/ui/FaultScene'

export default function NotFound() {
  useSeo('/404')
  return (
    <section className="bg-paper py-24">
      <div className="container-x flex flex-col items-center text-center">
        <FaultScene kind="socket" className="w-64 rounded-2xl" title="A faulty socket" />
        <p className="eyebrow mt-8 text-amber-deep">Error 404</p>
        <h1 className="mt-3 text-4xl font-bold">This page is out of order.</h1>
        <p className="mt-3 max-w-md text-muted">The link may be broken or the page may have moved. Let’s get you back to something that works.</p>
        <div className="mt-8 flex gap-3"><Button to="/">Go to homepage</Button><Button href="/#contact" variant="ghost">Contact us</Button></div>
      </div>
    </section>
  )
}
