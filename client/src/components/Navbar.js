import { Link } from 'react-router-dom';
export default function NavBar(){
    return(
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="/">ALPHA BIBLI</a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button"
                    data-toggle="collapse"
                    data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <input className="form-control form-control-dark w-100" type="text" placeholder="Search"
                   aria-label="Search"/>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap" style={{marginLeft: "1rem"}}>
                    <Link to='/homelib/' className="btn btn-sm btn-primary" >Home</Link>
                    <Link to='/main/' className="btn btn-sm btn-primary" style={{marginLeft: "1rem"}}>Livres</Link>
                    <Link to='/main/loans/' className="btn btn-sm btn-primary" style={{marginLeft: "1rem"}}>Emprunts</Link>
                    <Link to='/main/users/' className="btn btn-sm btn-primary" style={{marginLeft: "1rem"}}>Utilisateurs</Link>
                </li>
            </ul>
        </nav>
    );
}