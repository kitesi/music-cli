import chalk from 'chalk';
import { songsPath } from './get-default-songs-path.js';

import type { Argv } from 'yargs';

export type PlayMusicArgs = ReturnType<ReturnType<typeof builder>['parseSync']>;

const sortTypes = ['a', 'm', 'c'] as const;

export function builder(y: Argv) {
    return y
        .option('dry-run', {
            alias: 'd',
            type: 'boolean',
        })
        .option('limit', {
            alias: 'l',
            type: 'number',
        })
        .option('skip', {
            type: 'number',
        })
        .option('new', {
            alias: 'n',
            type: 'boolean',
        })
        .option('play-new-first', {
            type: 'boolean',
            alias: 'pnf',
        })
        .option('delete-old-first', {
            type: 'boolean',
            alias: 'dof',
        })
        .option('dry-paths', {
            type: 'boolean',
            alias: 'p',
        })
        .option('persist', {
            type: 'boolean',
        })
        .option('live', {
            type: 'boolean',
            describe: 'get live query results with stdin input',
        })
        .option('editor', {
            type: 'boolean',
            describe: 'pipes songs through editor first',
            alias: 'e',
        })
        .option('add-to-tag', {
            type: 'string',
            alias: 'a',
        })
        .option('set-to-tag', {
            type: 'string',
        })
        .option('vlc-path', {
            type: 'string',
            default: 'vlc',
        })
        .option('tags', {
            type: 'array',
            alias: 't',
            string: true,
        })
        .option('sort-type', {
            choices: sortTypes,
            alias: 's',
            default: 'm' as typeof sortTypes[number],
        })
        .option('songs-path', {
            type: 'string',
            default: songsPath,
        })
        .positional('terms', {
            type: 'string',
            array: true,
            default: [] as string[],
        });
}

interface RunArgs {
    songs: string[];
    args: PlayMusicArgs;
    exec: (query: string) => Promise<any>;
    songsPath: string;
    vlcPath: string;
}

export function run({ exec, vlcPath, args, songs, songsPath }: RunArgs) {
    exec(
        `${vlcPath} ${songs
            .map(
                (s) =>
                    `"${songsPath}/${s}" ${
                        args.new || args.playNewFirst ? '--no-random' : ''
                    }`
            )
            .join(' ')}`
    ).catch((reason: any) =>
        console.error('Error: ' + (reason?.message || `\n\n${reason}`))
    );
}

export function message(songs: string[]) {
    const playingMessage = `Playing: [${songs.length}]`;

    console.log(
        `${playingMessage}\n` +
            songs.map((e) => chalk.redBright('- ' + e)).join('\n')
    );
}
