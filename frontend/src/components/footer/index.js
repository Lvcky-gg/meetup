
import './index.css'
export const Footer = () => {

    return (
        <div className="shell">
            <div className="top">
                <h2>Create Your Own Meetup Group.</h2>
                <button>Get Started</button>

            </div>
            <div className="mid">
                <p>Your Account</p>
                <ul></ul>
                <p>Discover</p>
                <ul></ul>
                <p>Meetup</p>
                <ul></ul>
                
            </div>
            <div className="bot">
                <div>
                    <p>Follow Us</p>
                    <ul>
                    <a href="https://github.com/Lvcky-gg"><i class="fa-brands fa-github"></i></a>
                    <a href="https://www.facebook.com/john.odonnell.96/"><i class="fa-brands fa-facebook"></i></a>
                    <a href="https://www.instagram.com/lvcky_gg/"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/john-o-donnell-36a38a161/"><i class="fa-brands fa-linkedin"></i></a>
                    </ul>

                </div>
                <div>
                    
                </div>
                
            </div>
            <div className="copyrights">
                <p>copyright John R. O'Donnell</p>

            </div>
        </div>
    )

}