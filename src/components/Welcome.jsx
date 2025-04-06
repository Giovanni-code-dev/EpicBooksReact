import { Alert } from 'react-bootstrap'

const Welcome = ({ title }) => (
  <Alert className="text-center">
    {title ? (
      <h1>{title}</h1>
    ) : (
      <h1 data-testid="welcome-title">Benvenuti in EpiBooks!</h1>
    )}
  </Alert>
)

export default Welcome
