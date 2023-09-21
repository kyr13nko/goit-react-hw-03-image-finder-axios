import { LoadButton, LoadButtonWrapper } from './Button.styled';

const Button = ({ onBtnClick }) => {
  return (
    <LoadButtonWrapper>
      <LoadButton type="button" onClick={onBtnClick}>
        Load more
      </LoadButton>
    </LoadButtonWrapper>
  );
};

export default Button;
