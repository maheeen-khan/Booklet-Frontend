import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { DeleteTwoTone } from '@ant-design/icons';


import axios from 'axios';
function MyCard(props) {

  const doDelete = async () => {

    console.log('Delete', props.id)
    const selectedBook = await axios.delete(`https://backend-production-9c79.up.railway.app/deletebook/${props.id}`)

    // Update the UI immediately
    props.onDelete(props.id);
    <DltComp />
    console.log(selectedBook, "has been deleted")

  }
  return (
    <Card style={{ width: '18rem'}} className='card text-center my-3 py-3 px-1'>
      {/* <Card.Img variant="top" src={props.img}/> */}
      <Card.Body>
        <Card.Title style={{ color: '#640D5F' }}>{props.name}</Card.Title>
        <Card.Text>
          {props.desc}
        </Card.Text>
        <div className='d-flex justify-content-around mt-5 mb-3'>
          <p style={{ color: '#626F47' }} className='published px-2'>{props.pub} </p><p className='published px-2'>{props.year}</p>
          </div>

        <div className='d-flex justify-content-around'>
          <button class="button">Get in touch</button>
          <DeleteTwoTone twoToneColor="#EB5B00" onClick={doDelete} style={{ fontSize: '19px' }} />
        </div>
      </Card.Body>
    </Card>
  );
}

export default MyCard;