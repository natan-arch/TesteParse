import "./style.css";

const Post = ({ author, imageUrl, description }) => {
    return (
        <>
            <div className="post_container">
                <div className="heading_part">
                    <img src={imageUrl} alt="profile_pic" className="profile_pic"></img>
                    <p className="name">{author}</p>
                </div>
                <div className="image_part">
                    <img src={imageUrl} alt="post_pic" className="post_pic"></img>
                </div>
                <div className="bottom_part">
                    <ul className="post_actions">
                        <li><i className="far fa-heart"></i></li>
                        <li><i className="fas fa-location-arrow"></i></li>
                        <li><i className="far fa-comment"></i></li>
                        <li><i className="fas fa-ellipsis-h"></i></li>
                    </ul>
                    <div>
                        <img src={imageUrl} alt="liked_by_pic" className="liked_by_pic"></img>
                        <p className="liked_by">Liked by &nbsp; <strong style={{ display: 'inline-block' }}> jugesh_raghav </strong> &nbsp; and &nbsp;<strong> 1,234,988&nbsp; </strong> others.</p>
                    </div>
                    <div>
                        <h4>{author}</h4>
                        <p>{description}</p>
                    </div>
                    <div>
                        <h4>{author}</h4>
                    </div>
                    <div>
                        <h4>{author}</h4>
                    </div>
                </div>
                <div className="comment_part">
                    <p>Add a Comment...</p>
                    <p>Add a Comment...</p>
                    <p>A</p>
                </div>
            </div>
        </>
    );
};

export default Post;