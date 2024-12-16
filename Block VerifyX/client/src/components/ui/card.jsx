
export const Card = ({ children }) => (
  <div className="rounded-lg shadow-lg p-4 bg-white  w-[90%]">{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="text-xl font-bold border-b p-2">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-2xl font-semibold">{children}</h2>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);
