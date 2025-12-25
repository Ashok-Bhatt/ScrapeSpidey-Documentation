import { themeColors } from '../../constants/classes.js';

const AboutCard = ({ title, description, className }) => {
    return (
        <div className={`rounded-lg shadow-md ${className}`}>
            <h2 className={`text-2xl font-semibold ${themeColors.text}`}>{title}</h2>
            <p className="">{description}</p>
        </div>
    );
};

export default AboutCard;