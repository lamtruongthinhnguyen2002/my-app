import React, { useState } from 'react';
import ArticleItem from './components/ArticleItem';
import ConfirmationPopup from './components/ConfirmationPopup';
import LoadingSpinner from './components/LoadingSpinner';
import './index.css';

// Định nghĩa kiểu cho Comment và Article (Cần đồng bộ với ArticleItem.tsx)
interface Comment {
  id: string;
  text: string;
  timestamp: string;
}

interface Article {
  id: string;
  title: string;
  description: string;
  likes: number; // Thêm
  comments: Comment[]; // Thêm
}

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([
    { id: '1', title: 'Bài viết 1 (Mẫu)', description: 'Mô tả bài viết số 1.', likes: 5, comments: [{id: 'c1', text: 'Tuyệt vời!', timestamp: '2025-06-21 10:00'}] },
    { id: '2', title: 'Bài viết 2 (Mẫu)', description: 'Mô tả bài viết số 2.', likes: 12, comments: [{id: 'c2', text: 'Rất hay!', timestamp: '2025-06-21 11:30'}, {id: 'c3', text: 'Cảm ơn tác giả.', timestamp: '2025-06-21 11:45'}] },
    { id: '3', title: 'Bài viết 3 (Mẫu)', description: 'Mô tả bài viết số 3.', likes: 0, comments: [] },
  ]);

  // States cho tính năng thêm bài viết
  const [newArticleTitle, setNewArticleTitle] = useState<string>('');
  const [newArticleDescription, setNewArticleDescription] = useState<string>('');
  const [isLoadingArticleAdd, setIsLoadingArticleAdd] = useState<boolean>(false); // Đổi tên để rõ ràng hơn

  // States cho thông báo lỗi validation
  const [titleError, setTitleError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');

  // States cho tính năng xóa bài viết
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [articleToDeleteId, setArticleToDeleteId] = useState<string | null>(null);

  // States cho tính năng bình luận
  const [isCommentingArticleId, setIsCommentingArticleId] = useState<string | null>(null); // Lưu ID bài viết đang được gửi comment

  // --- LOGIC XỬ LÝ THÊM BÀI VIẾT ---
  const handleAddArticle = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError('');
    setDescriptionError('');

    let isValid = true;

    if (!newArticleTitle.trim()) {
      setTitleError('Tiêu đề không được để trống.');
      isValid = false;
    }

    if (!newArticleDescription.trim()) {
      setDescriptionError('Mô tả không được để trống.');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setIsLoadingArticleAdd(true); // Bắt đầu hiển thị loading cho thêm bài viết

    setTimeout(() => {
      const newArticle: Article = {
        id: Date.now().toString(),
        title: newArticleTitle,
        description: newArticleDescription,
        likes: 0, // Bài viết mới bắt đầu với 0 likes
        comments: [], // Bài viết mới bắt đầu với mảng comments rỗng
      };

      setArticles(prevArticles => [newArticle, ...prevArticles]);
      setNewArticleTitle('');
      setNewArticleDescription('');
      setIsLoadingArticleAdd(false); // Kết thúc loading
    }, 2000);
  };

  // --- LOGIC XỬ LÝ XÓA BÀI VIẾT ---
  const handleRequestDelete = (id: string) => {
    setArticleToDeleteId(id);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    if (articleToDeleteId) {
      setTimeout(() => {
        setArticles(articles.filter(article => article.id !== articleToDeleteId));
        console.log(`Đã xóa bài viết với ID: ${articleToDeleteId}`);
        setShowDeletePopup(false);
        setArticleToDeleteId(null);
      }, 1000);
    } else {
      setShowDeletePopup(false);
      setArticleToDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setArticleToDeleteId(null);
  };

  // --- LOGIC XỬ LÝ THẢ TIM (LIKE) ---
  const handleToggleLike = (articleId: string) => {
    setArticles(prevArticles =>
      prevArticles.map(article =>
        article.id === articleId
          ? { ...article, likes: article.likes + 1 } // Tăng số lượt thích lên 1
          : article
      )
    );
  };

  // --- LOGIC XỬ LÝ THÊM BÌNH LUẬN ---
  const handleAddComment = (articleId: string, commentText: string) => {
    setIsCommentingArticleId(articleId); // Bắt đầu loading cho bài viết này

    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now().toString(),
        text: commentText,
        timestamp: new Date().toLocaleString(), // Thời gian hiện tại
      };

      setArticles(prevArticles =>
        prevArticles.map(article =>
          article.id === articleId
            ? { ...article, comments: [...article.comments, newComment] } // Thêm bình luận mới vào cuối mảng
            : article
        )
      );
      setIsCommentingArticleId(null); // Kết thúc loading
    }, 2500); // Giả lập chờ 2.5 giây cho bình luận
  };

  const currentArticleToDelete = articles.find(article => article.id === articleToDeleteId);
  const deleteMessage = currentArticleToDelete
    ? `Bạn có chắc chắn muốn xóa bài viết "${currentArticleToDelete.title}"?`
    : 'Bạn có chắc chắn muốn xóa mục này?';

  return (
    <div className="App">
      <h1 style={appStyles.header}>My Articles</h1>

      {/* Form nhập liệu */}
      <div style={appStyles.formContainer}>
        <h2>Thêm bài viết mới</h2>
        <form onSubmit={handleAddArticle}>
          <input
            type="text"
            placeholder="Tiêu đề bài viết"
            value={newArticleTitle}
            onChange={(e) => {
              setNewArticleTitle(e.target.value);
              if (titleError && e.target.value.trim()) {
                setTitleError('');
              }
            }}
            style={{ ...appStyles.input, ...(titleError ? appStyles.inputError : {}) }}
            disabled={isLoadingArticleAdd}
          />
          {titleError && <p style={appStyles.errorMessage}>{titleError}</p>}

          <textarea
            placeholder="Mô tả bài viết"
            value={newArticleDescription}
            onChange={(e) => {
              setNewArticleDescription(e.target.value);
              if (descriptionError && e.target.value.trim()) {
                setDescriptionError('');
              }
            }}
            rows={4}
            style={{ ...appStyles.textarea, ...(descriptionError ? appStyles.inputError : {}) }}
            disabled={isLoadingArticleAdd}
          />
          {descriptionError && <p style={appStyles.errorMessage}>{descriptionError}</p>}

          <button type="submit" style={appStyles.addButton} disabled={isLoadingArticleAdd}>
            {isLoadingArticleAdd ? 'Đang thêm...' : 'Thêm Bài Viết'}
          </button>
        </form>
      </div>

      {isLoadingArticleAdd && <LoadingSpinner />} {/* Loading cho việc thêm bài viết */}

      {/* Danh sách bài viết */}
      <div style={appStyles.articleList}>
        <h2>Danh sách bài viết</h2>
        {articles.length === 0 && !isLoadingArticleAdd ? (
          <p style={{ textAlign: 'center', color: '#666' }}>Không có bài viết nào.</p>
        ) : (
          articles.map(article => (
            <ArticleItem
              key={article.id}
              article={article}
              onConfirmDelete={handleRequestDelete}
              onToggleLike={handleToggleLike} // Truyền hàm like
              onAddComment={handleAddComment} // Truyền hàm add comment
              isCommenting={isCommentingArticleId === article.id} // Truyền trạng thái loading cho comment
            />
          ))
        )}
      </div>

      {/* Component Popup Xác nhận */}
      <ConfirmationPopup
        isOpen={showDeletePopup}
        message={deleteMessage}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

// ... Các styles vẫn giữ nguyên như trước hoặc có thể thêm/điều chỉnh cho phù hợp.
const appStyles: { [key: string]: React.CSSProperties } = {
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px',
  },
  formContainer: {
    maxWidth: '600px',
    margin: '30px auto',
    padding: '25px',
    border: '1px solid #eee',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 15px rgba(0,0,0,0.08)',
    textAlign: 'center',
  },
  input: {
    width: 'calc(100% - 24px)',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1em',
    boxSizing: 'border-box',
  },
  textarea: {
    width: 'calc(100% - 24px)',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1em',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  inputError: {
    borderColor: '#dc3545',
  },
  errorMessage: {
    color: '#dc3545',
    fontSize: '0.9em',
    marginTop: '-10px',
    marginBottom: '15px',
    textAlign: 'left',
    paddingLeft: '5px',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '12px 30px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1.1em',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  addButtonHover: {
    backgroundColor: '#218838',
  },
  articleList: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    marginTop: '30px',
  },
};


export default App;