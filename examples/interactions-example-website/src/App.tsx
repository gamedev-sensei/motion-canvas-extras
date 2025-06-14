import './App.css'
import animation from "@gamedev-sensei/interactions-example-project?url"
import {ErrorBoundary} from "react-error-boundary"
import {Player} from "./Player"

function App() {
    return (
        <>
            <ErrorBoundary FallbackComponent={({ error }) => <pre>{error.toString()}</pre>}>
                <Player src={animation} />
            </ErrorBoundary>
        </>
    )
}

export default App
