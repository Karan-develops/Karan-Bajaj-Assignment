export const postKaranBajaj =
  ("/bfhl",
  (req, res) => {
    const data = req.body.data || [];
    const numbers = [
      ...new Set(
        data.filter((item) => !isNaN(item) && item.trim() !== "").map(Number)
      ),
    ];

    const alphabets = [
      ...new Set(data.filter((item) => /^[a-zA-Z]$/.test(item))),
    ];

    let highest_alphabet = "";

    for (const item of data) {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (item.length === 1 && isNaN(item)) {
        alphabets.push(item);
        if (
          !highest_alphabet ||
          item.toUpperCase() > highest_alphabet.toUpperCase()
        ) {
          highest_alphabet = item;
        }
      }
    }

    res.json({
      is_success: true,
      user_id: "karanAggarwal",
      email: "mrkaran2k5@gmail.com",
      roll_number: "2237205",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet ? [highest_alphabet] : [],
    });
  });

export const getKaranBajaj =
  ("/bfhl",
  (req, res) => {
    res.json({ operation_code: 1 });
  });
