import './Home.css';

function Home() {
    if (localStorage.getItem("santaToken") === null) {
        return (
            <div>
            <div className="center">
                <div className="text-center">
                    <h1>Santa's Wishlist</h1>
                    <h3>Create and share your Christmas wishlists with your friends !</h3>
                    <a href="/signup" className="button">Create an account</a>
                </div>
            </div>
            </div>
        );
    }
    else{
        return (
            <div>
            <div className="center">
                <div className="text-center">
                    <h1>Santa's Wishlist</h1>
                    <h3>Welcome dude !</h3>
                    <h3>Create and share your Christmas wishlists with your friends !</h3>
                </div>
            </div>
            </div>
        );        
    }
    }

export default Home;