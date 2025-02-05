
import styles from './page.module.css';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./components/Editor'),{
  ssr: false, // 禁用服务器端渲染
});

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Editor />
      </main>
    </div>
  );
}
