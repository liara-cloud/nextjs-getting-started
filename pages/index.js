import MyAnimation from '../components/MyAnimation';

function Home() {
  return (
    <div>
      <h1>{process.env.NEXT_PUBLIC_liara_url}</h1>
      <MyAnimation/>
    </div>
  );
}

export default Home;
