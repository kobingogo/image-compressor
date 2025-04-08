// 定义 props 接口
interface HeaderProps {
  i18n: {
    language: string; // 当前语言
    changeLanguage: (lang: string) => void; // 切换语言方法
  };
  t: (key: string) => string; // 翻译函数
}

// 使用类型注解修复组件
export default function Header({ i18n, t }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white py-12">
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">{t('appTitle')}</h1>
          <p className="text-xl opacity-90 max-w-2xl leading-relaxed">
            {t('appDescription')}
          </p>
        </div>
        <div>
          <button
            className="text-white bg-transparent border border-white rounded-md py-2 px-4"
            onClick={() =>
              i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en')
            }
          >
            {i18n.language === 'en' ? '中文' : 'English'}
          </button>
        </div>
      </div>
    </header>
  );
}