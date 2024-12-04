function DetailSection({
    icon,
    title,
    children,
  }: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="space-y-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          {icon}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
            {title}
          </span>
        </h3>
        <div className="p-4 space-y-2 rounded-lg shadow-inner bg-gray-50 dark:bg-gray-800">
          {children}
        </div>
      </div>
    );
  }
export default DetailSection