export default function EmailList({ emails }) {
  if (emails.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg">
        📨 No emails found, bro.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {emails.map((email) => (
        <div
          key={email.id}
          className="p-4 bg-black rounded-2xl shadow-md border border-gray-200 font-sans hover:shadow-lg transition-shadow duration-200"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            📌 {email.subject}
          </h2>
          <p className="text-gray-600 text-sm">{email.snippet}</p>
        </div>
      ))}
    </div>
  );
}
