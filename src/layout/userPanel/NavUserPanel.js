import UserPanel from '../utils/UserPanel';
import Layout from '../Layout';
import { useSelector } from 'react-redux';
import { getUserName } from '../../redux/selectors';

function NavUserPanel({ origin, children }) {
  const user = useSelector(getUserName);

  return (
    <Layout>
      <section className="travels-first-container">
        <div className="container travels-container">
          <div className="row">
            <h1>Travels to {user}</h1>

            <UserPanel
              user={user}
              origin={origin}
            />
            {children}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default NavUserPanel;
