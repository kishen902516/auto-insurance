export default function Home() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Comprehensive Motor Insurance
            <span className="text-primary-600 block">for Malaysia</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get instant quotes, manage your policy, and file claims online. 
            Fully compliant with JPJ requirements and Malaysian regulations.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <a
                href="/quote"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
              >
                Get Quote Now
              </a>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <a
                href="/login"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Existing Customer
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Instant Quotes
              </h3>
              <p className="text-gray-600">
                Get competitive rates instantly with our advanced rating engine.
                Compare comprehensive, TPFT, and third-party coverage options.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                NCD Integration
              </h3>
              <p className="text-gray-600">
                Automatic No Claims Discount verification through Central NCD database.
                Get the best rates based on your driving history.
              </p>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                JPJ Compliant
              </h3>
              <p className="text-gray-600">
                Fully integrated with JPJ eINSURANS system. Instant e-Cover Note
                generation and automatic road tax renewal support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}