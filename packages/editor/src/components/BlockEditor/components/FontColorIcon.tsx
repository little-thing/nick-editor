type FontColorIconProps = { 
    currentColor: string;
}

export const FontColorIcon = ({ currentColor }: FontColorIconProps) => {

return (
    <>
    <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M10.8335 16.667H20.1668"
                      stroke={currentColor ?? '#E03B3B'}
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 14.333L15.5 7.33301L19 14.333"
                      stroke="#1F1F1F"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.1665 12H17.8332"
                      stroke="#1F1F1F"
                      strokeWidth="1.16667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.8821 12.8664C12.9472 12.9315 13.0527 12.9315 13.1178 12.8664L15.9501 10.0342C16.0151 9.96907 16.1207 9.96907 16.1858 10.0342L16.6321 10.4805C16.6972 10.5456 16.6972 10.6511 16.6321 10.7162L13.1178 14.2305C13.0527 14.2956 12.9472 14.2956 12.8821 14.2305L9.36779 10.7162C9.30271 10.6511 9.30271 10.5456 9.36779 10.4805L9.81412 10.0342C9.87921 9.96907 9.98474 9.96907 10.0498 10.0342L12.8821 12.8664Z"
            fill="#999999"
          />
        </svg>
      </>
    );
};