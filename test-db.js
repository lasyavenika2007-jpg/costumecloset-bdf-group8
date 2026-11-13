
const db = require('./database');

function finish() {
    db.run('ROLLBACK', () => {
        console.log('\nTest transaction rolled back.');
        db.close((err) => {
            if (err) console.log(err.message);
            else console.log('Database connection closed.');
        });
    });
}

db.all('SELECT * FROM actors', (err, rows) => {
    if (err) return console.log(err.message);

    console.log('\nACTORS:');
    console.table(rows);

    db.all('SELECT * FROM costumes', (err, rows) => {
        if (err) return console.log(err.message);

        console.log('\nCOSTUMES:');
        console.table(rows);

        // Start temporary test transaction
        db.run('BEGIN TRANSACTION', (err) => {
            if (err) return console.log(err.message);

            // Test INSERT
            db.run(
                `INSERT INTO hires (actor_id, costume_id, status)
                 VALUES (1, 15, 'active')`,
                function (err) {
                    if (err) {
                        console.log('Insert failed:', err.message);
                        return finish();
                    }

                    const hireId = this.lastID;
                    console.log('\nINSERT successful. Hire ID:', hireId);

                    // Test SELECT
                    db.get(
                        'SELECT * FROM hires WHERE id = ?',
                        [hireId],
                        (err, row) => {
                            if (err) return finish();

                            console.log('\nINSERTED HIRE:');
                            console.table([row]);

                            // Test UPDATE
                            db.run(
                                `UPDATE hires
                                 SET status = 'returned',
                                     return_date = CURRENT_TIMESTAMP
                                 WHERE id = ?`,
                                [hireId],
                                (err) => {
                                    if (err) {
                                        console.log(err.message);
                                        return finish();
                                    }

                                    console.log('\nUPDATE successful.');

                                    // Verify UPDATE
                                    db.get(
                                        'SELECT * FROM hires WHERE id = ?',
                                        [hireId],
                                        (err, updatedRow) => {
                                            if (err) return finish();

                                            console.log('\nUPDATED HIRE:');
                                            console.table([updatedRow]);

                                            // Test foreign key constraint
                                            db.run(
                                                `INSERT INTO hires
                                                 (actor_id, costume_id, status)
                                                 VALUES (999999, 15, 'active')`,
                                                (err) => {
                                                    if (err) {
                                                        console.log(
                                                            '\nForeign key constraint working:',
                                                            err.message
                                                        );
                                                    } else {
                                                        console.log(
                                                            '\nForeign key test FAILED.'
                                                        );
                                                    }

                                                    finish();
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        });
    });
});
