/* eslint-disable react/no-unescaped-entities */
export default function FriendshipFirst() {
  const principles = [
    { title: 'Friendship over flirting', description: 'This is about genuine connection, not dating.' },
    { title: 'Respect over pressure', description: 'Your boundaries are respected. Always.' },
    { title: 'People over profiles', description: 'We focus on real conversations, not metrics.' },
    { title: 'Curiosity over judgment', description: 'Different perspectives are welcome here.' },
    { title: 'Genuine connection over follower counts', description: 'Quality of connection matters.' },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-8 text-center">
          Friendship first.
        </h2>

        <p className="text-xl text-slate-700 text-center mb-16 max-w-2xl mx-auto">
          This isn't about dating. Whether you're single, dating, married or simply looking for more
          people in your life, you're welcome here.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {principles.map((principle) => (
            <div key={principle.title} className="bg-white p-6 rounded-lg border border-slate-200">
              <h3 className="text-lg font-semibold text-primary-900 mb-3">{principle.title}</h3>
              <p className="text-slate-600">{principle.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-secondary-50 rounded-lg p-8 border border-secondary-200">
          <p className="text-lg text-slate-700 leading-relaxed">
            The goal is simple: meet people, talk, laugh, learn about each other's lives and see where
            a genuine friendship goes. That might mean lifelong friends, casual conversation buddies,
            cultural exchange partners, or people you check in with occasionally. All of that is
            friendship. We're just here to make the introduction.
          </p>
        </div>
      </div>
    </section>
  );
}
