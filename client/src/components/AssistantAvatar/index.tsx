import rnStatic from 'assets/images/rn_static_01.png';

interface AssistantAvatarProps {
  children: React.ReactNode;
}
export const AssistantAvatar = ({ children }: AssistantAvatarProps) => {
  return (
    <center>
      <article className="row dTop">
        <figure className="imgContain col-5">
          <img
            src={rnStatic}
            className="imgNurse"
            alt="Icon of the Reminder Nurse"
          />
        </figure>
        <section className="col-5 animate__animated animate__fadeIn">
          <div className="card dailyDialogue border-0 shadow-sm">
            <div className="card-body">{children}</div>
          </div>
        </section>
      </article>
    </center>
  );
};
