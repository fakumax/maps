import Head from 'next/head';

/*

Specifying display=optional minimizes the risk of invisible text or layout shift.
If swapping to the custom font after it has loaded is important to you, 
then use display=swap instead.

*/
const FontHeader = () => {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=optional" rel="stylesheet" />
      </Head>
    </div>
  );
};

export default FontHeader;
