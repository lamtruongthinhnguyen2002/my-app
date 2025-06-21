import * as React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

type Props = {
  article: IArticle
  removeArticle: (article: IArticle) => void
}
// Định nghĩa kiểu cho một Comment
interface Comment {
  id: string;
  text: string;
  timestamp: string; // Để lưu thời gian bình luận
}

// Định nghĩa kiểu cho một Article (cập nhật)
interface Article {
  id: string;
  title: string;
  description: string;
  likes: number; // Thêm trường likes
  comments: Comment[]; // Thêm mảng comments
}

export const Article: React.FC<Props> = ({ article, removeArticle }) => {
  const dispatch: Dispatch<any> = useDispatch()

  const deleteArticle = React.useCallback(
    (article: IArticle) => dispatch(removeArticle(article)),
    [dispatch, removeArticle]
  )

  return (
    <div className="Article">
      <div>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
      </div>
      <button onClick={() => deleteArticle(article)}>Delete</button>
    </div>
  )
}