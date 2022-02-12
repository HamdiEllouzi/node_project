import "./listeFrend.css";
export default function ListeFrend({ frend }) {
  return (
    <li>
      <div className='item'>
        <div className='icon people'>
          <img className='icon-img ' src={frend?.userImage} alt='' />
        </div>
        <span className='text'>{frend?.userFirstName + " " + frend?.userLastName}</span>
      </div>
    </li>
  );
}
