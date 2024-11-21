<div className="bg-gray-900 min-h-screen p-8">
      <h1 className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-emerald-400 to-teal-600 text-transparent bg-clip-text">
        Discover Extraordinary Escapes
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {Property.map((property, index) => (
        <SinglePropertCard key={index} property={property} />
      ))}
      </div>
    </div>