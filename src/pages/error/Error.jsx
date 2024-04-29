function Error() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Error 500</h3>
        <p>Looks like our server is taking a nap. 😴</p>
      </div>
    </div>
  );
}

export default Error;
