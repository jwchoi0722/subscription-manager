import { Link } from 'react-router'

import { Button } from "@/components/ui/button"

function Welcome() {
  return (
    <>
      <h1>Welcome to Subscription Manager</h1>
      <p><i>Built with React</i></p>
      <br />
      <Button key="app_link">
        <Link to="/Dashboard">Go to App</Link>
      </Button>
    </>
  )
}

export default Welcome
