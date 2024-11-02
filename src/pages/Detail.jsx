import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();

  return (
    <>
      <div>{id} 상세 정보</div>
    </>
  );
}

export default Detail;
