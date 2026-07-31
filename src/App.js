import Navbar from "./Components/Navbar"
import Story from "./Components/Story"
import SideBox from "./Components/SideBox"
import Post from "./Components/Posts"

const MOCK_POSTS = [
    { id: 1, user: "alice", avatar: "", image: "", likes: 120, caption: "Hello world!" },
    { id: 2, user: "bob", avatar: "", image: "", likes: 45, caption: "Loving this app." },
    { id: 3, user: "carol", avatar: "", image: "", likes: 89, caption: "Great day outside." },
    { id: 4, user: "dave", avatar: "", image: "", likes: 200, caption: "Coffee time ☕" },
    { id: 5, user: "eve", avatar: "", image: "", likes: 33, caption: "Sunset vibes 🌅" },
    { id: 6, user: "frank", avatar: "", image: "", likes: 77, caption: "Pizza night 🍕" },
    { id: 7, user: "grace", avatar: "", image: "", likes: 150, caption: "Road trip 🚗" },
    { id: 8, user: "hank", avatar: "", image: "", likes: 60, caption: "Book of the week 📚" },
]

const App = () => {
    return (
        <>
            <Navbar />
            <div className="main_container">
                <div className="page_content">
                    <div className="main_content">
                        <Story />
                        {MOCK_POSTS.map((post) => (
                            <Post key={post.id} {...post} />
                        ))}
                    </div>
                    <SideBox />
                </div>
            </div>
        </>
    )
}

export default App;