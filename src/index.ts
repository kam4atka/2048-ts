import './assets/css/normalize.css';
import './assets/css/style.css';
import Application from './components/application';

function bootstrap() {
  const application = new Application();
  application.init();
}

bootstrap();
