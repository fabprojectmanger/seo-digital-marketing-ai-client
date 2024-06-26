import "./PrimaryOptions.css";
import { useSEOContext } from "../../context/SEOContext";
import { PRIMARY_OPTIONS } from "../../data/options";

const PrimaryOptions = () => {
  const { selectedPrimaryOption, setSelectedPrimaryOption, hasFinalizedPrompt } = useSEOContext();

  const handleOptionSelection = (e) => {
    const value = e.target.dataset?.selection;
    setSelectedPrimaryOption(value);
  };

  return (
    <>
      {!hasFinalizedPrompt && (
        <div className="seo__primary-options">
          <div
            className={`seo__primary-option ${
              selectedPrimaryOption === PRIMARY_OPTIONS.DOMAIN ? "selected" : ""
            }`}
            data-selection={PRIMARY_OPTIONS.DOMAIN}
            onClick={handleOptionSelection}
          >
            Domain analysis &nbsp;🔍
          </div>
          <div
            className={`seo__primary-option ${
              selectedPrimaryOption === PRIMARY_OPTIONS.WRITING ? "selected" : ""
            }`}
            data-selection={PRIMARY_OPTIONS.WRITING}
            onClick={handleOptionSelection}
          >
            Content writing &nbsp;📝
          </div>
        </div>
      )}
    </>
  );
};
export default PrimaryOptions;
