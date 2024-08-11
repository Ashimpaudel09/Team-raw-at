import React, { useState } from 'react';
import '../css/course.css'; // Make sure to import the CSS file
import SuggestedProjects from './SuggestedProjects'; // Import the new component

const CourseDetail = ({ course }) => {
  const [questions, setQuestions] = useState([]);
  const [questionInput, setQuestionInput] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [replyInput, setReplyInput] = useState("");
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [showRepliesView, setShowRepliesView] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false); // Track if the course is completed

  const handleQuestionSubmit = () => {
    if (questionInput.trim() !== "") {
      setQuestions([...questions, { text: questionInput, replies: [] }]);
      setQuestionInput("");
    }
  };

  const handleReplySubmit = () => {
    if (replyInput.trim() !== "" && selectedQuestion !== null) {
      const updatedQuestions = questions.map((q, index) =>
        index === selectedQuestion
          ? { ...q, replies: [...q.replies, replyInput] }
          : q
      );
      setQuestions(updatedQuestions);
      setReplyInput("");
      setShowReplyPopup(false);
      setSelectedQuestion(null);
    }
  };

  const openReplyPopup = (index) => {
    console.log("Opening reply popup for question index:", index);
    setSelectedQuestion(index);
    setShowReplyPopup(true);
  };

  const openRepliesView = (index) => {
    console.log("Opening replies view for question index:", index);
    setSelectedQuestion(index);
    setShowRepliesView(true);
  };

  const handleCompletion = () => {
    setCourseCompleted(true); // Mark the course as completed
  };

  if (courseCompleted) {
    return <SuggestedProjects props={course.title} />; // Render the SuggestedProjects component if the course is completed
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="course-detail-container">
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <h2>Scopes</h2>
      <ul>
        {course.scopes.map((scope, index) => (
          <li key={index}>{scope}</li>
        ))}
      </ul>

      <h2>Examples</h2>
      <ul>
        {course.examples.map((example, index) => (
          <li key={index}>{example}</li>
        ))}
      </ul>

      {course.videoFile && (
        <div>
          <h2>Course Video</h2>
          <video controls src={course.videoFile} />
        </div>
      )}

      <div className="course-showing-qna">
        <h2>Any Queries Regarding the Course:</h2>
        <div className="qna-input">
          <textarea
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
            placeholder="Ask a question..."
          />
          <button onClick={handleQuestionSubmit}>Submit</button>
        </div>

        {/* List of Questions */}
        <ul className="qna-list">
          {questions.map((question, index) => (
            <li key={index} className="qna-item">
              {question.text}
              <div className="qna-item-buttons">
                <button className="reply-btn" onClick={() => openReplyPopup(index)}>Reply</button>
                <span className="replies-link" onClick={() => openRepliesView(index)}>
                  {question.replies.length} {question.replies.length === 1 ? 'Reply' : 'Replies'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showReplyPopup && (
        <div className="reply-popup">
          <h3>Reply to Question</h3>
          <textarea
            value={replyInput}
            onChange={(e) => setReplyInput(e.target.value)}
            placeholder="Write your reply here..."
          />
          <div className="reply-popup-actions">
            <button onClick={handleReplySubmit}>Submit</button>
            <button onClick={() => setShowReplyPopup(false)}>Cancel</button>
          </div>
        </div>
      )}

      {showRepliesView && (
        <div className="replies-view-popup">
          <h3>Replies for Question:</h3>
          <p>{questions[selectedQuestion].text}</p>
          <div className="replies-list">
            {questions[selectedQuestion].replies.length > 0 ? (
              questions[selectedQuestion].replies.map((reply, replyIndex) => (
                <div key={replyIndex} className="qna-reply">
                  <p>{reply}</p>
                </div>
              ))
            ) : (
              <p>No replies yet.</p>
            )}
          </div>
          <button onClick={() => setShowRepliesView(false)}>Close</button>
        </div>
      )}

      <button className="completion-button" onClick={handleCompletion}>
        Mark as Completed
      </button>
    </div>
  );
};

export default CourseDetail;
