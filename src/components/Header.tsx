import { Link } from "react-router-dom"

export const Header = () => {


    return (
        <div className="h-10 w-full fixed top-0 z-10" style={{backgroundColor: "#ffe3a6"}}>
            <div className="grid grid-cols-3 px-10 justify-items-center mt-2">
                <Link to="/">
                    <h1>Início</h1>
                </Link>
                <Link to="/register-person">
                    <h1>Cadastro de Pessoas</h1>
                </Link>
                <Link to="/list-person">
                    <h1>Listagem de Pessoas</h1>
                </Link>
            </div>
        </div>
    )
}
