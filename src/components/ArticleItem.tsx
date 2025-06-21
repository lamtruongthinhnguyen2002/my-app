import React, { useState } from 'react';

// Định nghĩa kiểu cho một Comment (Cần đồng bộ với App.tsx)
interface Comment {
  id: string;
  text: string;
  timestamp: string;
}

// Định nghĩa kiểu cho một Article (Cần đồng bộ với App.tsx)
interface Article {
  id: string;
  title: string;
  description: string;
  likes: number;
  comments: Comment[];
}

// Định nghĩa kiểu cho props của ArticleItem (cập nhật)
interface ArticleItemProps {
  article: Article;
  onConfirmDelete: (id: string) => void;
  // Thêm props cho chức năng Like và Comment
  onToggleLike: (articleId: string) => void;
  onAddComment: (articleId: string, commentText: string) => void;
  isCommenting: boolean; // Để biết component cha đang tải comment cho bài viết này
}

const ArticleItem: React.FC<ArticleItemProps> = ({
  article,
  onConfirmDelete,
  onToggleLike,
  onAddComment,
  isCommenting,
}) => {
  const [newCommentText, setNewCommentText] = useState<string>(''); // State cho input bình luận mới

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newCommentText.trim()) {
      onAddComment(article.id, newCommentText);
      setNewCommentText(''); // Xóa nội dung input sau khi gửi
    }
  };

  return (
    <div style={articleItemStyles.container}>
      <h3 style={articleItemStyles.title}>{article.title}</h3>
      <p style={articleItemStyles.description}>{article.description}</p>

      {/* --- Phần Like --- */}
      <div style={articleItemStyles.actions}>
        <button
          onClick={() => onToggleLike(article.id)}
          style={articleItemStyles.likeButton}
        >
          ❤️ {article.likes} Likes
        </button>
        <button
          style={articleItemStyles.deleteButton}
          onClick={() => onConfirmDelete(article.id)}
        >
          Delete
        </button>
      </div>

      {/* --- Phần Bình luận --- */}
      <div style={articleItemStyles.commentsSection}>
        <h4 style={articleItemStyles.commentsHeader}>Bình luận ({article.comments.length})</h4>
        <div style={articleItemStyles.commentsList}>
          {article.comments.length === 0 ? (
            <p style={articleItemStyles.noComments}>Chưa có bình luận nào.</p>
          ) : (
            article.comments.map(comment => (
              <div key={comment.id} style={articleItemStyles.commentItem}>
                <p style={articleItemStyles.commentText}>{comment.text}</p>
                <span style={articleItemStyles.commentTimestamp}>{comment.timestamp}</span>
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleCommentSubmit} style={articleItemStyles.commentForm}>
          <textarea
            placeholder="Viết bình luận của bạn..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            rows={2}
            style={articleItemStyles.commentTextarea}
            disabled={isCommenting} // Tắt input khi đang gửi comment
          />
          <button type="submit" style={articleItemStyles.submitCommentButton} disabled={isCommenting}>
            {isCommenting ? 'Đang gửi...' : 'Gửi Bình luận'}
          </button>
        </form>
      </div>
    </div>
  );
};

const articleItemStyles: { [key: string]: React.CSSProperties } = {
  container: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 10px 0',
    color: '#333',
  },
  description: {
    margin: '0 0 15px 0',
    color: '#666',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  likeButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  likeButtonHover: {
    backgroundColor: '#0056b3',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  deleteButtonHover: {
    backgroundColor: '#c82333',
  },
  commentsSection: {
    marginTop: '20px',
    borderTop: '1px solid #eee',
    paddingTop: '15px',
  },
  commentsHeader: {
    margin: '0 0 10px 0',
    color: '#555',
    fontSize: '1.1em',
  },
  commentsList: {
    maxHeight: '150px', // Cuộn nếu quá nhiều bình luận
    overflowY: 'auto',
    border: '1px solid #eee',
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#fff',
    marginBottom: '15px',
  },
  commentItem: {
    padding: '8px 0',
    borderBottom: '1px dashed #f0f0f0',
  },
  commentItemLast: {
    borderBottom: 'none',
  },
  commentText: {
    margin: '0',
    fontSize: '0.95em',
    color: '#333',
  },
  commentTimestamp: {
    fontSize: '0.8em',
    color: '#999',
    display: 'block',
    marginTop: '2px',
  },
  noComments: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
  },
  commentForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  commentTextarea: {
    width: 'calc(100% - 20px)',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '0.95em',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  submitCommentButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    alignSelf: 'flex-end', // Nút nằm bên phải
    transition: 'background-color 0.3s ease',
  },
  submitCommentButtonHover: {
    backgroundColor: '#218838',
  },
};

export default ArticleItem;