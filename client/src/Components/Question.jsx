const Question = ({ questionNo, question, nameGroup, handleOption }) => {


    return (
        <div className="w-max">
            <div className="flex flex-row items-center w-max gap-x-6">
                <div className="lato text-lg">{questionNo}.</div>
                <div className="lato text-lg">{question.question}</div>
            </div>
            <div className="mt-4 flex flex-row items-center w-max gap-x-6">
                <div className="flex flex-col gap-y-4 lato">
                    {question.options.map((givenOption, index) => {
                        return (
                            <div className="flex flex-row justify-start gap-x-6" key={givenOption + index}>
                                <input onChange={(e) => handleOption(question._id, e.target.value)} value={givenOption} id={givenOption + index} name={nameGroup} type="radio" className="w-4" />
                                <label className="text-lg" htmlFor={givenOption + index}>{givenOption}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default Question;