import Navbar from "./Components/Navbar"
import Story from "../src/Components/Story"
import SideBox from "./Components/SideBox"
import Post from "./Components/Posts"

const MOCK_POSTS = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
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
              <Post key={post.id} />
            ))}
          </div>
          <SideBox />
        </div>
      </div>
    </>
  )
}

export default App;