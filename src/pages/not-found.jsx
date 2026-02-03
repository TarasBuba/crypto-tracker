
import {Link} from "react-router-dom";

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
    },
    heading: {
        fontSize: '72px',
        marginBottom: '20px',
    },
    message: {  
        fontSize: '18px',
        marginBottom: '30px',
    },
    link: {
        fontSize: '16px',
        color: '#007BFF',
        textDecoration: 'none',
    },
};



const NotFundPage = () => {
    return (
        <div style={styles.container}>   
            <h1 style={styles.heading}>404 - Page Not Found</h1>
            <p style={styles.message}>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" style={styles.link}>Go back to Home</Link> 
        </div>
    )
}
export default NotFundPage;