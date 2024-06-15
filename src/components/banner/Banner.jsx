
const Banner = () => {
    return (
        <div className="hero min-h-72 md:min-h-96" style={{ backgroundImage: 'url(https://i.ibb.co/CsG7Gwv/20945188.jpg)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-xl">
                    <h1 className="mb-5 text-3xl md:text-4xl font-bold">Welcome to Connect Sphere</h1>
                    {/* <p className="mb-5 hidden md:block">We are a well-known restaurant brand that is dedicated to providing our customers with exceptional food experiences. We not only offer delicious meals prepared ...</p> */}
                    <form >
                        <div className='flex justify-center p-1 overflow-hidden space-x-5  md:w-96 mx-auto'>
                            <input
                                className='md:px-6 px-3 py-1 border rounded-lg md:py-2 bg-white outline-none'
                                type='text'
                                name='search'
                                required
                                placeholder='Search By Tag'
                                aria-label='Search By Tag'
                            />

                            <button className='px-1 md:px-4 md:py-3 text-sm font-medium bg-secondary text-white  uppercase  rounded-md '>
                                Search
                            </button>
                        </div>
                    </form>                </div>
            </div>
        </div>
    );
};

export default Banner;