import "./Search.css";

export default function Search({setCity}) {
  
  let inputHandler = (e) => {
    if (e.key === "Enter") {  
      const city = e.target.value;
      setCity(city);
      e.target.value = "";  
    }
  };

  return (
    <>
      <div className="Header">
        <div className="input-container">
        <i className='fa fa-search icon'></i>
        <input
          placeholder="Search"
          label="Search"
          className="user-input"
          onKeyDown={inputHandler}
        />
        </div>
      </div>
    </>
  );
}
