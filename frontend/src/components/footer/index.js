import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SignupFormModal from '../SignupFormModal';
import OpenModalButton from '../OpenModalButton';
import './index.css'
export const Footer = ({isLoaded}) => {
    let sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const onClick = () => {
        if(sessionUser){
            history.push('/groups')
        }
    }
    
    

    return (
        <div className="shell">
            <div className="top">
               {
                sessionUser ? (
                 <h2>Create Your Own TPG Group.</h2>
                ):(
                    <h2>Create Account</h2>
                )
               } 

                {
                    
                    sessionUser ? (
                        <button className="topButton" onClick={onClick}>Get Started</button>

                    ): (
                        <OpenModalButton
                        className="topButton"
                        buttonText="Get Started"
                        modalComponent={<SignupFormModal />}
                        // onClick={onClick}
                      />
                
                    )
                }
                

            </div>
            <div className="mid">
                <p className="footerP">Your Account</p>
                <ul ></ul>
                <p className="footerP">Discover</p>
                <ul></ul>
                <p className="footerP">Meetup</p>
                <ul></ul>
                
            </div>
            <div className="bot">
                <div className="botContainer">
                    <p className="footerP">Follow Me</p>
                    <ul className='socialFooter'>
                    <a href="https://github.com/Lvcky-gg"><i className="fa-brands fa-github"></i></a>
                    <a href="https://www.facebook.com/john.odonnell.96/"><i className="fa-brands fa-facebook"></i></a>
                    <a href="https://www.instagram.com/lvcky_gg/"><i className="fa-brands fa-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/john-o-donnell-36a38a161/"><i className="fa-brands fa-linkedin"></i></a>
                    </ul>

                </div>
                <div>
                    
                </div>
                
            </div>
            <div className="copyrights">
                <p className="footerP">copyright John R. O'Donnell</p>

            </div>
        </div>
    )

}