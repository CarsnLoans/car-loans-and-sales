import { Link } from 'react-router-dom';

const PageHeader = ({ title, subtitle, className = '', breadcrumbs = [] }) => {
  return (
    <div className={`bg-primary text-white py-16 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto text-center">
        {breadcrumbs.length > 0 && (
          <nav className="mb-4 text-sm text-white/90" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-center gap-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                  {index > 0 && <span className="opacity-60">/</span>}
                  {crumb.to ? (
                    <Link to={crumb.to} className="hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/80">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-white/90">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHeader;
