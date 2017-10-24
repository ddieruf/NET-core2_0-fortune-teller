using System;
using System.Collections.Generic;
using System.Linq;

namespace FortuneTeller.Services {
	public interface IFortuneTeller {
		void Add(Fortune item);
		IEnumerable<Fortune> List();
		Fortune GetRandom();
		Fortune Get(long key);
		void Remove(long key);
		void Update(Fortune item);
	}

	public class FortuneTeller : IFortuneTeller {
		private readonly FortuneTellerContext _context;

		public FortuneTeller(FortuneTellerContext context) {
			_context = context;

			//initialize the data
			if ( _context.Fortunes.Count() == 0 ) {
				Add(new Fortune { Text = "People are naturally attracted to you." });
				Add(new Fortune { Text = "You learn from your mistakes... You will learn a lot today." });
				Add(new Fortune { Text = "If you have something good in your life, don't let it go!" });
				Add(new Fortune { Text = "What ever you're goal is in life, embrace it visualize it, and for it will be yours." });
				Add(new Fortune { Text = "Your shoes will make you happy today." });
				Add(new Fortune { Text = "You cannot love life until you live the life you love." });
				Add(new Fortune { Text = "Be on the lookout for coming events; They cast their shadows beforehand." });
				Add(new Fortune { Text = "Land is always on the mind of a flying bird." });
				Add(new Fortune { Text = "The man or woman you desire feels the same about you." });
				Add(new Fortune { Text = "Meeting adversity well is the source of your strength." });
				Add(new Fortune { Text = "A dream you have will come true." });
				Add(new Fortune { Text = "Our deeds determine us, as much as we determine our deeds." });
				Add(new Fortune { Text = "Never give up. You're not a failure if you don't give up." });
				Add(new Fortune { Text = "You will become great if you believe in yourself." });
				Add(new Fortune { Text = "There is no greater pleasure than seeing your loved ones prosper." });
				Add(new Fortune { Text = "You will marry your lover." });
				Add(new Fortune { Text = "A very attractive person has a message for you." });
				Add(new Fortune { Text = "You already know the answer to the questions lingering inside your head." });
				Add(new Fortune { Text = "It is now, and in this world, that we must live." });
				Add(new Fortune { Text = "You must try, or hate yourself for not trying." });
				Add(new Fortune { Text = "You can make your own happiness." });
				Add(new Fortune { Text = "The greatest risk is not taking one." });
				Add(new Fortune { Text = "The love of your life is stepping into your planet this summer." });
				Add(new Fortune { Text = "Love can last a lifetime, if you want it to." });
				Add(new Fortune { Text = "Adversity is the parent of virtue." });
				Add(new Fortune { Text = "Serious trouble will bypass you." });
				Add(new Fortune { Text = "A short stranger will soon enter your life with blessings to share." });
				Add(new Fortune { Text = "Now is the time to try something new." });
				Add(new Fortune { Text = "Wealth awaits you very soon." });
				Add(new Fortune { Text = "If you feel you are right, stand firmly by your convictions." });
				Add(new Fortune { Text = "If winter comes, can spring be far behind?" });
				Add(new Fortune { Text = "Keep your eye out for someone special." });
				Add(new Fortune { Text = "You are very talented in many ways." });
				Add(new Fortune { Text = "A stranger, is a friend you have not spoken to yet." });
				Add(new Fortune { Text = "A new voyage will fill your life with untold memories." });
				Add(new Fortune { Text = "You will travel to many exotic places in your lifetime." });
				Add(new Fortune { Text = "Your ability for accomplishment will follow with success." });
				Add(new Fortune { Text = "Nothing astonishes men so much as common sense and plain dealing." });
				Add(new Fortune { Text = "Its amazing how much good you can do if you dont care who gets the credit." });
				Add(new Fortune { Text = "Everyone agrees. You are the best." });
				Add(new Fortune { Text = "LIFE CONSIST NOT IN HOLDING GOOD CARDS, BUT IN PLAYING THOSE YOU HOLD WELL." });
				Add(new Fortune { Text = "Jealousy doesn't open doors, it closes them!" });
				Add(new Fortune { Text = "It's better to be alone sometimes." });
				Add(new Fortune { Text = "When fear hurts you, conquer it and defeat it!" });
				Add(new Fortune { Text = "Let the deeds speak." });
				Add(new Fortune { Text = "You will be called in to fulfill a position of high honor and responsibility." });
				Add(new Fortune { Text = "The man on the top of the mountain did not fall there." });
				Add(new Fortune { Text = "You will conquer obstacles to achieve success." });
				Add(new Fortune { Text = "Joys are often the shadows, cast by sorrows." });
				Add(new Fortune { Text = "Fortune favors the brave." });
			}
		}

		public IEnumerable<Fortune> List() {
			return _context.Fortunes.ToList();
		}
		public Fortune GetRandom() {
			return Random<Fortune>(_context.Fortunes);
		}

		public void Add(Fortune item) {
			_context.Fortunes.Add(item);
			_context.SaveChanges();
		}

		public Fortune Get(long id) {
			return _context.Fortunes.FirstOrDefault(t => t.Id == id);
		}

		public void Remove(long id) {
			var entity = _context.Fortunes.First(t => t.Id == id);
			_context.Fortunes.Remove(entity);
			_context.SaveChanges();
		}

		public void Update(Fortune item) {
			_context.Fortunes.Update(item);
			_context.SaveChanges();
		}

		private T Random<T>(IEnumerable<T> enumerable) {
			if ( enumerable == null ) {
				throw new ArgumentNullException(nameof(enumerable));
			}

			// note: creating a Random instance each call may not be correct for you,
			// consider a thread-safe static instance
			var r = new Random();
			var list = enumerable as IList<T> ?? enumerable.ToList();
			return list.Count == 0 ? default(T) : list[r.Next(0, list.Count)];
		}
	}
}