import { Link } from "react-router-dom"

export const Header = () => {


    return (
        <div className="h-10 border-b-4 w-full fixed top-0">
            <div className="grid grid-cols-5 px-10 justify-items-center">
                <Link to="/">
                    <h1>Início</h1>
                </Link>
                <Link to="/register-person">
                    <h1>Cadastro de Pessoas</h1>
                </Link>
                <h1>Listagem de Pessoas</h1>
                <h1>Cadastro de Contato</h1>
                <h1>Listagem de Contato</h1>
            </div>
        </div>
    )
}
