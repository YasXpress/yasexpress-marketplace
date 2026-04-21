 
export default function Login({ 
setAdmin, 
showToast, 
loginData, 
setLoginData, 
handleLogin }) {
   

   

  return (
    <div className="login">
  <div className="login-box">

     <img 
        src="https://res.cloudinary.com/dgmk0u6xc/image/upload/v1776270417/20260413-175424_zphykv.png" 
        alt="logo" 
      />

    <h2>Admin Panel</h2>

    <input
      type="email"
      placeholder="Email"
      value={loginData.email}
      onChange={(e) =>
        setLoginData({ ...loginData, email: e.target.value })
      }
    />

    <input
      type="password"
      placeholder="Password"
      value={loginData.password}
      onChange={(e) =>
        setLoginData({ ...loginData, password: e.target.value })
      }
    />

    <button onClick={handleLogin}>Login</button>

  </div>
</div>
  );
}