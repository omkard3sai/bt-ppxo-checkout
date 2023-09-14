import { useEffect, useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useGetAlert, useSetAlert } from '../states/Alert/AlertHooks'
import { useGetAppState } from '../states/App/AppHooks'
import Link from '../components/Link'

const MainLayout = (props) => {
    const location = useLocation()
    const alert = useGetAlert()
    const appState = useGetAppState()
    const { success } = useSetAlert()

    useEffect(() => {
        success()
    }, [location, success])

    const finalRoutes = useMemo(() => {
        return props.routes.filter((route) => {
            console.log(route, appState)
            if (route.isDep && !appState?.clientInstance) return false
            return true
        })
    }, [props.routes, appState])

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <span className="navbar-brand">
                    <img
                        className="m-2"
                        src="https://www.paypalobjects.com/webstatic/icon/favicon.ico"
                        width="30"
                        height="30"
                        alt=""
                    />
                    {props.title || 'Heading Here'}
                </span>
                <nav className="nav">
                    {finalRoutes.map((route) => {
                        return (
                            <span key={route.path} className="nav-link">
                                <Link to={route.path} label={route.label} />
                            </span>
                        )
                    })}
                </nav>
            </nav>

            <div className={'bg-opacity-25 text-center p-2 bg-' + alert.type}>{alert.message}</div>
            <br />
            <div className="container-fluid">
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout
