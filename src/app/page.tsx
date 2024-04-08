import ItemUser from '@/componets/itemUser';
import CustomAppBar from '../componets/customAppBar'
export default function Home() {
  return (
    <main>
      <div>
        <CustomAppBar/>
        <h1 style={{textAlign: 'center'}}>Welcome!</h1>
        <ItemUser/>
      </div>
    </main>
  );
}
