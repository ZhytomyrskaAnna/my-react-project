import { Outlet } from 'react-router-dom';

const Practice7 = () => {
  return (
    <div className="practice-container">
      <div style={{ padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>Практична робота №7</h1>
        <p style={{ margin: '10px 0 0' }}>
          Тема: Робота з URL-параметрами та Query String (useParams, useSearchParams).
        </p>
      </div>
      <hr />
      
      <Outlet />

    </div>
  );
};

export default Practice7;