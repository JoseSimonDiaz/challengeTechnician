import { Tabs } from 'antd';
import TemplateBirthday from './pages/TemplateBirthday';
import WelcomeSing from './pages/WelcomeSing';
import { StarFilled, GiftFilled } from '@ant-design/icons';
import './styles/app.css';

export default function App() {
  return (
    <section className="app-container">
      <Tabs
        className="ant-tabs-content"
        defaultActiveKey="birthday"
        items={[
          {
            key: "birthday",
            label: (
              <span className="ant-tabs-content ">
                <StarFilled />
                Placa de Cumple
              </span>
            ),
            children: <TemplateBirthday />,
          },
          {
            key: "welcome",
            label: (
              <span className="ant-tabs-content ">
                <GiftFilled />
                Placa de Bienvenida
              </span>
            ),
            children: <WelcomeSing />,
          },
        ]}
      />
    </section>
  );
}
