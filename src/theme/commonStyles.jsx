/** Flexbox styles */
// Hi this is Vaibhav, I have these utilty objects are take from the repo: https://github.com/ohmyjavascript/airbnb-mui-clone/blob/main/src/themes/commonStyles.js

export const flexBetween = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  
  export const flexBetweenCenter = {
    display: 'flex',
    justifyContent: { xs: 'center', md: 'space-between' },
    alignItems: 'center',
  };
  
  export const footerLayout = {
    display: 'flex',
    flexDirection: { sx: 'column' },
    justifyContent: { xs: 'center', md: 'space-between' },
    alignItems: 'center',
  };
  
  export const flexCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  export const fullWidthFlex = {
    display: 'flex',
    width: '100%',
  };
  
  export const justifyCenter = { display: 'flex', justifyContent: 'center' };
  
  export const dFlex = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center"
  };
  
  export const fixedBottom = {
    position: 'absolute',
    bottom: 100,
    width: '100%',
  };
  
  export const displayOnDesktop = { display: { xs: 'none', md: 'block' } };
  
  /** Custom carousel styles */
  
  export const carouselDot = {
    color: '#fff',
    backgroundColor: '#000',
    borderRadius: 10,
    minWidth: 'auto',
  };
  
  export const fixedIcon = {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
  };
  
  export const carouselImage = {
    height: 275,
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    borderRadius: 3,
  };